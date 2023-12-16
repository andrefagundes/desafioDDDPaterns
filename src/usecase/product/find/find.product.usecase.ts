import InterfaceProductRepository from '../../../domain/product/repository/product-repository.interface'
import { InputFindProductDTO, OutputFindProductDTO } from './find.product.dto'

export default class FindProductUseCase {
  private readonly productRepository: InterfaceProductRepository

  constructor(productRepository: InterfaceProductRepository) {
    this.productRepository = productRepository
  }

  async execute({ id }: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const customer = await this.productRepository.findById(id)

    return {
      id: customer.id,
      name: customer.name,
      price: customer.price,
    }
  }
}
