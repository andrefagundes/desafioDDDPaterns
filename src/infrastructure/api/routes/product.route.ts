import { Request, Response, Router } from 'express'
import { InputCreateProductDTO } from '../../../usecase/product/create/create.product.dto'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'

export const productRoute = Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())

  const { name, price, type } = req.body

  try {
    const productDTO: InputCreateProductDTO = {
      type,
      name,
      price,
    }

    const output = await usecase.execute(productDTO)

    res.status(201).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await usecase.execute({})

    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
