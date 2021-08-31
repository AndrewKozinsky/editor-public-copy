import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'postgres_db',
    port: 5432,
    username: 'editor',
    password: 'dt52posQP00P',
    database: 'editor',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}

export default config