import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class InitUserTable1581056749774 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isUnique: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        { name: 'first_name', type: 'varchar', length: '255' },
        { name: 'last_name', type: 'varchar', length: '255' },
        { name: 'email', type: 'varchar', length: '150', isUnique: true },
        { name: 'password', length: '255', type: 'varchar', isNullable: true },
        { name: 'last_login', type: 'timestamp with time zone', isNullable: true },
        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', isNullable: true },
      ],
    }), true)

    await queryRunner.createIndex('user', new TableIndex({
      name: 'IDX_USERNAME',
      columnNames: ['username'],
    }))

    await queryRunner.createIndex('user', new TableIndex({
      name: 'IDX_EMAIL',
      columnNames: ['email'],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex('user', 'IDX_USERNAME')
    await queryRunner.dropIndex('user', 'IDX_EMAIL')
    await queryRunner.dropTable('user', true)
  }

}
