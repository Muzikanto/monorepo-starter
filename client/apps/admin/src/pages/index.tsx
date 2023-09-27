import { Example } from '@review-system/ui-kit';
import { internalFunc } from '@review-system/ui-utils';

import { AppPage } from '../utils/next';
import Layout from '../components/Layout/Layout';

const Home: AppPage = function () {
  return (
    <>
      <p>Main content</p>

      <Example />

      <p>{internalFunc()}</p>
    </>
  );
};

Home.getLayout = (children: JSX.Element) => <Layout>{children}</Layout>;

export default Home;
