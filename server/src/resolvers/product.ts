import { Product } from "../entities/Product";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateProductInput } from "../inputs/CreateProductInput";
import { UpdateProductInput } from "../inputs/UpdateProductInput";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products() {
    return Product.find();
  }

  @Query(() => Product)
  product(@Arg("id") id: string) {
    return Product.findOne({ where: { id } });
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data") data: CreateProductInput) {
    const product = Product.create(data);
    await product.save();
    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id") id: string,
    @Arg("data") data: UpdateProductInput
  ) {
    const product = await Product.findOne({ where: { id } });
    if (!product) throw new Error("Product not found!");
    Object.assign(product, data);
    await product.save();
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: string) {
    const product = await Product.findOne({ where: { id } });
    if (!product) throw new Error("Product not found!");
    await product.remove();
    return true;
  }
}
