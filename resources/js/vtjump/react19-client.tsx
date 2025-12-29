import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { VtjumpClientConfig } from './types';

type OverlayRect = Pick<
    DOMRect,
    'top' | 'left' | 'width' | 'height' | 'bottom'
>;

type AncestorTarget = {
    file: string;
    line: string;
    label: string;
};

const globalFlag = '__vtjumpReact19Init';
type VtjumpWindow = typeof window & { __vtjumpReact19Init?: boolean };

export const initVtjumpReact19 = (config: VtjumpClientConfig): void => {
    const globalWindow = window as VtjumpWindow;
    if (globalWindow[globalFlag]) {
        return;
    }

    globalWindow[globalFlag] = true;

    const normalizeFile = (file?: string | null): string => {
        if (!file) {
            return '';
        }
        if (file.startsWith('/')) {
            return file;
        }
        return config.workingDir ? `${config.workingDir}/${file}` : `/${file}`;
    };

    const openViaProtocol = (
        file: string | null,
        line: string | null,
    ): void => {
        const normalizedFile = normalizeFile(file).replaceAll('\\\\', '/');
        const target = line ? `${normalizedFile}:${line}` : normalizedFile;
        const targetPath = target.startsWith('/') ? target : `/${target}`;
        window.location.href = `${config.protocol}://file${targetPath}`;
    };

    const formatDisplayPath = (file: string): string => {
        const normalizedFile = normalizeFile(file).replaceAll('\\\\', '/');
        if (!config.workingDir) {
            return normalizedFile.replace(/^\//, '');
        }
        const working = config.workingDir.replaceAll('\\\\', '/');
        if (normalizedFile.startsWith(working)) {
            const sliceIndex =
                working.length +
                (normalizedFile.charAt(working.length) === '/' ? 1 : 0);
            return normalizedFile.slice(sliceIndex);
        }
        return normalizedFile;
    };

    const collectAncestorTargets = (element: Element): AncestorTarget[] => {
        const seen = new Set<string>();
        const targets: AncestorTarget[] = [];
        let current: Element | null = element;

        while (current && current !== document.documentElement) {
            if (current.hasAttribute('data-vtjump-file')) {
                const file = current.getAttribute('data-vtjump-file') || '';
                const line = current.getAttribute('data-vtjump-line') || '';
                const key = `${file}:${line}`;

                if (!seen.has(key)) {
                    targets.push({
                        file,
                        line,
                        label: line
                            ? `${formatDisplayPath(file)}:${line}`
                            : formatDisplayPath(file),
                    });
                    seen.add(key);
                }
            }
            current = current.parentElement;
        }

        return targets;
    };

    const HoverOverlay: React.FC = () => {
        const [modifierPressed, setModifierPressed] = useState(false);
        // Use ref to track current element to avoid redundant state updates
        const currentElementRef = useRef<Element | null>(null);

        const [overlayState, setOverlayState] = useState<{
            rect: OverlayRect;
            file: string;
            line: string;
            visible: boolean;
        }>({
            rect: { top: 0, left: 0, width: 0, height: 0, bottom: 0 },
            file: '',
            line: '',
            visible: false,
        });
        const [ancestorMenu, setAncestorMenu] = useState<{
            items: AncestorTarget[];
            position: { x: number; y: number };
            visible: boolean;
        }>({
            items: [],
            position: { x: 0, y: 0 },
            visible: false,
        });
        const menuRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            let rafId: number | null = null;

            const updateTarget = (element: Element | null) => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }

                // Optimization: Don't update if element hasn't changed
                if (element === currentElementRef.current && element !== null) {
                    return;
                }

                currentElementRef.current = element;

                rafId = requestAnimationFrame(() => {
                    if (!element) {
                        setOverlayState((prev) => ({
                            ...prev,
                            visible: false,
                        }));
                        return;
                    }

                    const file = element.getAttribute('data-vtjump-file') || '';
                    const line = element.getAttribute('data-vtjump-line') || '';
                    const rect = element.getBoundingClientRect();

                    setOverlayState({
                        rect,
                        file,
                        line,
                        visible: true,
                    });
                });
            };

            const handlePointerMove = (event: PointerEvent) => {
                const targetElement =
                    event.target instanceof Element
                        ? event.target.closest('[data-vtjump]')
                        : null;

                updateTarget(targetElement);

                if (event.metaKey || event.ctrlKey) {
                    setModifierPressed(true);
                } else {
                    setModifierPressed(false);
                }
            };

            const handlePointerLeave = () => {
                updateTarget(null);
                setModifierPressed(false);
            };

            const refreshRect = () => {
                if (!currentElementRef.current) {
                    return;
                }
                const element = currentElementRef.current;
                const rect = element.getBoundingClientRect();

                // Check if rect actually changed significantly to avoid spam
                setOverlayState((prev) => {
                    if (!prev.visible) return prev;
                    if (
                        Math.abs(prev.rect.top - rect.top) < 1 &&
                        Math.abs(prev.rect.left - rect.left) < 1 &&
                        Math.abs(prev.rect.width - rect.width) < 1 &&
                        Math.abs(prev.rect.height - rect.height) < 1
                    ) {
                        return prev;
                    }
                    return { ...prev, rect };
                });
            };

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.metaKey || event.ctrlKey) {
                    setModifierPressed(true);
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                if (!event.metaKey && !event.ctrlKey) {
                    setModifierPressed(false);
                }
            };

            document.addEventListener('pointermove', handlePointerMove, {
                passive: true,
                capture: true,
            });
            document.addEventListener('pointerleave', handlePointerLeave, {
                passive: true,
                capture: true,
            });
            window.addEventListener('scroll', refreshRect, {
                passive: true,
                capture: true,
            });
            window.addEventListener('resize', refreshRect, {
                passive: true,
                capture: true,
            });
            window.addEventListener('keydown', handleKeyDown, true);
            window.addEventListener('keyup', handleKeyUp, true);

            return () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                document.removeEventListener(
                    'pointermove',
                    handlePointerMove,
                    true,
                );
                document.removeEventListener(
                    'pointerleave',
                    handlePointerLeave,
                    true,
                );
                window.removeEventListener('scroll', refreshRect, true);
                window.removeEventListener('resize', refreshRect, true);
                window.removeEventListener('keydown', handleKeyDown, true);
                window.removeEventListener('keyup', handleKeyUp, true);
            };
        }, []); // Empty dependency array as we use refs/functional updates where needed

        useEffect(() => {
            const handleSingleClick = (event: MouseEvent) => {
                if (event.button !== 0) {
                    return;
                }
                if (!(event.metaKey || event.ctrlKey)) {
                    return;
                }
                const targetElement =
                    event.target instanceof Element
                        ? event.target.closest('[data-vtjump]')
                        : null;
                if (!targetElement) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                setAncestorMenu((prev) =>
                    prev.visible ? { ...prev, visible: false } : prev,
                );

                const vtjumpFile =
                    targetElement.getAttribute('data-vtjump-file');
                const vtjumpLine =
                    targetElement.getAttribute('data-vtjump-line') || '1';

                openViaProtocol(vtjumpFile, vtjumpLine);
            };

            const handleContextMenu = (event: MouseEvent) => {
                if (!(event.metaKey || event.ctrlKey)) {
                    return;
                }
                const targetElement =
                    event.target instanceof Element
                        ? event.target.closest('[data-vtjump]')
                        : null;
                if (!targetElement) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                const ancestors = collectAncestorTargets(targetElement);
                if (ancestors.length === 0) {
                    return;
                }
                if (ancestors.length === 1) {
                    openViaProtocol(ancestors[0].file, ancestors[0].line);
                    return;
                }

                const menuX = Math.max(
                    Math.min(event.clientX, window.innerWidth - 320),
                    8,
                );
                const menuY = Math.max(
                    Math.min(event.clientY, window.innerHeight - 220),
                    8,
                );

                setAncestorMenu({
                    items: ancestors,
                    position: { x: menuX, y: menuY },
                    visible: true,
                });
            };

            // Use capture phase to ensure we intercept before other handlers
            document.addEventListener('click', handleSingleClick, true);
            document.addEventListener('contextmenu', handleContextMenu, true);

            return () => {
                document.removeEventListener('click', handleSingleClick, true);
                document.removeEventListener(
                    'contextmenu',
                    handleContextMenu,
                    true,
                );
            };
        }, []);

        useEffect(() => {
            if (!ancestorMenu.visible) {
                return;
            }

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setAncestorMenu((prev) =>
                        prev.visible ? { ...prev, visible: false } : prev,
                    );
                }
            };

            const handleOutsideClick = (event: MouseEvent) => {
                if (
                    menuRef.current &&
                    event.target instanceof Node &&
                    menuRef.current.contains(event.target)
                ) {
                    return;
                }
                setAncestorMenu((prev) =>
                    prev.visible ? { ...prev, visible: false } : prev,
                );
            };

            window.addEventListener('keydown', handleKeyDown, true);
            document.addEventListener('click', handleOutsideClick, true);

            return () => {
                window.removeEventListener('keydown', handleKeyDown, true);
                document.removeEventListener('click', handleOutsideClick, true);
            };
        }, [ancestorMenu.visible]);

        const { rect, file, line, visible } = overlayState;
        // Only show if visible AND modifier key is pressed
        const show = visible && modifierPressed;
        const { items, position, visible: menuVisible } = ancestorMenu;
        const ancestorMenuVisible = menuVisible && items.length > 0;

        const handleAncestorSelect = (item: AncestorTarget) => {
            openViaProtocol(item.file, item.line || '1');
            setAncestorMenu((prev) =>
                prev.visible ? { ...prev, visible: false } : prev,
            );
        };

        if (!visible && rect.width === 0) {
            return null;
        }

        const label = line
            ? `${formatDisplayPath(file)}:${line}`
            : formatDisplayPath(file);
        const overlayTop = rect.top;
        const overlayLeft = rect.left;
        const overlayWidth = rect.width;
        const overlayHeight = rect.height;
        const rectBottom = rect.bottom ?? rect.top + rect.height;
        const shouldPlaceBelow = window.innerHeight - rectBottom < 48;
        const tooltipTop = shouldPlaceBelow
            ? overlayTop + overlayHeight + 4
            : Math.max(overlayTop - 32, 4);
        const tooltipLeft = Math.max(
            Math.min(overlayLeft, window.innerWidth - 300),
            8,
        );

        return (
            <>
                <div
                    style={{
                        position: 'fixed',
                        top: overlayTop,
                        left: overlayLeft,
                        width: overlayWidth,
                        height: overlayHeight,
                        borderRadius: 0,
                        backgroundColor: 'rgba(30, 41, 59, 0.1)', // Slate tint
                        border: '1px solid rgba(148, 163, 184, 0.4)', // Slate border
                        pointerEvents: 'none',
                        zIndex: 2147483645,
                        opacity: show ? 1 : 0,
                        // Smooth transition for position and size to prevent flickering
                        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box',
                    }}
                />
                <div
                    style={{
                        position: 'fixed',
                        top: tooltipTop,
                        left: tooltipLeft,
                        pointerEvents: 'none',
                        zIndex: 2147483646,
                        opacity: show ? 1 : 0,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(9, 9, 11, 0.9)', // Zinc-950
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        color: '#e4e4e7', // Zinc-200
                        borderRadius: 0,
                        fontSize: '12px',
                        lineHeight: '1',
                        fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                        whiteSpace: 'nowrap',
                        // Match overlay transition
                        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <span style={{ fontWeight: 500 }}>{label}</span>
                </div>
                {ancestorMenuVisible && (
                    <div
                        ref={menuRef}
                        style={{
                            position: 'fixed',
                            top: position.y + 8,
                            left: position.x,
                            zIndex: 2147483647,
                            backgroundColor: 'rgba(9, 9, 11, 0.85)', // Zinc-950 with transparency
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            color: '#e4e4e7', // Zinc-200
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: 0,
                            boxShadow: '0 20px 40px -4px rgba(0, 0, 0, 0.6)',
                            minWidth: 260,
                            maxWidth: 480,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0', // No padding for the container
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0, // Remove gap to make it seamless
                            }}
                        >
                            {items.map((item, index) => (
                                <button
                                    key={`${item.file}:${item.line}:${index}`}
                                    type="button"
                                    onClick={() => handleAncestorSelect(item)}
                                    style={{
                                        all: 'unset',
                                        cursor: 'pointer',
                                        padding: '10px 14px', // Comfortable internal padding
                                        backgroundColor: 'transparent',
                                        color: '#e4e4e7', // Zinc-200
                                        fontSize: 13,
                                        fontFamily:
                                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                        lineHeight: 1.5,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 12,
                                        borderBottom:
                                            index < items.length - 1
                                                ? '1px solid rgba(255, 255, 255, 0.03)'
                                                : 'none', // Very subtle separator
                                        transition:
                                            'background-color 0.1s ease',
                                    }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.backgroundColor =
                                            'rgba(255, 255, 255, 0.06)';
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.backgroundColor =
                                            'transparent';
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 400,
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-all',
                                        }}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };

    const mountOverlay = () => {
        const containerId = 'vtjump-react19-overlay';
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }
        createRoot(container).render(React.createElement(HoverOverlay));
    };

    mountOverlay();
};
