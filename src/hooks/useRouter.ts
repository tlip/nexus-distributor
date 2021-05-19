/**
 *  For more details, refer: https://usehooks.com/useRouter/
 */
import { useMemo } from 'react';
import * as H from 'history';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  match,
} from 'react-router-dom';
import { getQueryObject } from 'utils/getQueryObject';

interface IRouterValue {
  // For convenience add push(), replace(), pathname at top level
  push(path: H.Path, state?: H.LocationState): void;
  replace(path: H.Path, state?: H.LocationState): void;
  replace(location: H.LocationDescriptor<H.LocationState>): void;
  pathname: H.Pathname;
  // Merge params and parsed query string into single "query" object
  // so that they can be used interchangeably.
  // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
  query: { [param: string]: any };
  // Include match, location, history objects so we have
  // access to extra React Router functionality if needed.
  match: match;
  location: H.Location;
  history: H.History;
}

export const useRouter = (): IRouterValue => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(
    () => ({
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...getQueryObject(location.search), // Convert string to object
        ...params,
      },
      match,
      location,
      history,
    }),
    [params, match, location, history]
  );
};
