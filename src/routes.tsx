import { Navigate } from 'react-router-dom';

import { HomeWrapper, ItemWrapper } from 'pages';
import { AppLayout } from 'layouts/app';

const routes = [
  {
    path: '',
    element: <AppLayout />,
    children: [
      { path: '', element: <HomeWrapper /> },
      { path: '*', element: <Navigate to="" /> }
    ]
  },
  {
    path: '/:item_type/:slug',
    element: <AppLayout />,
    children: [
      { path: '', element: <ItemWrapper /> },
      { path: '*', element: <Navigate to="" /> }
    ]
  }
];

export default routes;
