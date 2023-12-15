import IProductRepository from '../../../domain/product/repository/product-repository.interface'
import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from './update.product.dto'

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const product = await this.productRepository.findById(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)

    await this.productRepository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
