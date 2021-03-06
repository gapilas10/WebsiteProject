import { NavBar } from "../components/NavBar";
import { useDummyClipsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const Index = () => {
  const [{ data }] = useDummyClipsQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.dummyClips.map((p) => (
          <div key={p.id}>
            {p.name} //
            {p.description} //
            {p.price} //
          </div>
        ))
      )}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
