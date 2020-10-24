import { HttpException } from '@nestjs/common'
import { Connection, EntityManager } from 'typeorm'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'

interface Transaction {
  queryRunner: QueryRunner | undefined
  manager: EntityManager
}

export const startTransaction = async (
  connection: Connection,
  entityManager?: EntityManager | undefined,
): Promise<Transaction> => {
  if (entityManager) {
    return {
      manager: entityManager,
      queryRunner: undefined,
    }
  }
  const queryRunner = connection.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()

  return {
    manager: queryRunner.manager,
    queryRunner: queryRunner,
  }
}

export const rollbackTransactionAndThrowError = async (queryRunner: QueryRunner | undefined, err: any): Promise<never> => {
  queryRunner && (queryRunner.isTransactionActive && await queryRunner.rollbackTransaction())
  throw new HttpException(err && err.message, (err && err.status) || 500)
}

export const releaseTransaction = async (queryRunner: QueryRunner | undefined): Promise<void> => {
  queryRunner && await queryRunner.release()
}

export const commitTransaction = async (queryRunner: QueryRunner | undefined): Promise<void> => {
  queryRunner && await queryRunner.commitTransaction()
}
