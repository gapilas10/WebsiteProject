import { DummyClip } from "../entities/DummyClip";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateDummyClipInput } from "../inputs/CreateDummyClipInput";
import { UpdateDummyClipInput } from "../inputs/UpdateDummyClipInput";

@Resolver()
export class DummyClipResolver {
  @Query(() => [DummyClip])
  dummyClips() {
    return DummyClip.find();
  }

  @Query(() => DummyClip)
  dummyClip(@Arg("id") id: string) {
    return DummyClip.findOne({ where: { id } });
  }

  @Mutation(() => DummyClip)
  async createDummyClip(@Arg("data") data: CreateDummyClipInput) {
    const dummyClip = DummyClip.create(data);
    await dummyClip.save();
    return dummyClip;
  }

  @Mutation(() => DummyClip)
  async updateDummyClip(
    @Arg("id") id: string,
    @Arg("data") data: UpdateDummyClipInput
  ) {
    const dummyClip = await DummyClip.findOne({ where: { id } });
    if (!dummyClip) throw new Error("DummyClip not found!");
    Object.assign(dummyClip, data);
    await dummyClip.save();
    return dummyClip;
  }

  @Mutation(() => Boolean)
  async deleteDummyClip(@Arg("id") id: string) {
    const dummyClip = await DummyClip.findOne({ where: { id } });
    if (!dummyClip) throw new Error("DummyClip not found!");
    await dummyClip.remove();
    return true;
  }
}
