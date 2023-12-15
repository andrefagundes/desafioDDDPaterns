import { Sequelize } from 'sequelize-typescript'
import IProductRepository from '../../../domain/product/repository/product-repository.interface'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import { InputCreateProductDTO } from './create.product.dto'
import CreateProductUseCase from './create.product.usecase'

describe('Integration test create product use case', () => {
  let input: InputCreateProductDTO
  let productRepository: IProductRepository
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    input = {
      type: 'a',
      name: 'Tênis',
      price: 10,
    }

    sequelize.addModels([ProductModel])
    await sequelize.sync()

    productRepository = new ProductRepository()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const createCustomerUseCase = new CreateProductUseCase(productRepository)

    const output = await createCustomerUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

  it('should thrown an errror when product name is missing', async () => {
    const createCustomerUseCase = new CreateProductUseCase(productRepository)

    input.name = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    )
  })

  it('should thrown an errror when product type not supported', async () => {
    const createCustomerUseCase = new CreateProductUseCase(productRepository)

    input.type = 'c'

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      'Product type not supported',
    )
  })
})
