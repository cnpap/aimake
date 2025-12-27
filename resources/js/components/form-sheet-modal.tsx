import { FormSheet } from '@/components/form-sheet';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { type ReactNode } from 'react';

interface FormSheetModalProps {
    title: ReactNode;
    description?: ReactNode;
    children: (close: () => void) => ReactNode;
    contentWidthClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
}

export const FormSheetModal = NiceModal.create(
    ({
        title,
        description,
        children,
        contentWidthClassName,
        headerClassName,
        bodyClassName,
    }: FormSheetModalProps) => {
        const modal = useModal();

        const handleClose = () => {
            void Promise.resolve(modal.hide()).finally(() => {
                modal.remove();
            });
        };

        const renderTitle =
            typeof title === 'string' ? (
                <span className="text-xl font-bold tracking-tight">
                    {title}
                </span>
            ) : (
                title
            );

        return (
            <FormSheet
                open={modal.visible}
                onOpenChange={(open) => {
                    if (!open) {
                        handleClose();
                    }
                }}
                title={renderTitle}
                description={description}
                contentWidthClassName={contentWidthClassName}
                headerClassName={headerClassName}
                bodyClassName={bodyClassName}
            >
                {children(handleClose)}
            </FormSheet>
        );
    },
);
