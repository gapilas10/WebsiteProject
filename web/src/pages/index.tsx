import { NavBar } from "../components/NavBar";
import { useDummyClipsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data } = useDummyClipsQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.dummyClips.map((p) => <div key={p.id}>{p.name}</div>)
      )}
    </>
  );
};
export default withApollo({ ssr: true })(Index);
