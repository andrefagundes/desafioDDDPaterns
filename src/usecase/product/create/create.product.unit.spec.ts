import { InputCreateProductDTO } from './create.product.dto'
import CreateProductUseCase from './create.product.usecase'


describe('Unit test create product use case', () => {
  let input: InputCreateProductDTO
  let productRepository: any

  beforeEach(() => {
    input = {
      type: 'a',
      name: 'T-shirt',
      price: 200,
    }

    productRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    }
  })

  it('should create a product', async () => {
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const output = await createProductUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

  it('should thrown an errror when product name is missing', async () => {
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.name = ''

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    )
  })

  it('should thrown an errror when type not supported', async () => {
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.type = 'c'

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Product type not supported',
    )
  })
})
