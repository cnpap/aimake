export type DatabaseType =
    | 'postgres'
    | 'mysql'
    | 'sqlserver'
    | 'oracle'
    | 'access';

type DatabaseIconAsset = {
    light: string;
    dark?: string;
};

export const databaseIconAssets: Record<DatabaseType, DatabaseIconAsset> = {
    postgres: {
        light: '/svg/postgresql.svg',
    },
    mysql: {
        light: '/svg/MySQL_light.svg',
        dark: '/svg/MySQL_dark.svg',
    },
    sqlserver: {
        light: '/svg/sql-server.svg',
    },
    oracle: {
        light: '/svg/oracle-svgrepo-com.svg',
    },
    access: {
        light: '/svg/microsoft-access.svg',
    },
};

export const databaseTypeLabels: Record<DatabaseType, string> = {
    postgres: 'PostgreSQL',
    mysql: 'MySQL',
    sqlserver: 'SQL Server',
    oracle: 'Oracle',
    access: 'Microsoft Access',
};
