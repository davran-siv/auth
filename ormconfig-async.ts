import { ConfigService } from '@nestjs/config'
import { SnakeNamingStrategy } from './src/shared/repository/snake-naming-steategy'

// This file needs for NestJS
const type: any = 'postgres'

const typeormConfigAsync = (config: ConfigService) => ({
  type,
  host: config.get('PG_HOST'),
  port: 5432,
  username: config.get('PG_USER_NEXT'),
  password: config.get('PG_PASSWORD_NEXT'),
  database: config.get('NODE_ENV') === 'test' ? 'test_payform' : config.get('PG_DATABASE_NEXT'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: false,
  uuidExtension: 'uuid-ossp',
  cli: {
    migrationsDir: 'migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
})

export default typeormConfigAsync
