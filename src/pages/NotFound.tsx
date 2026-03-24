import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <section className="not-found page-enter">
      <p className="eyebrow">404 Error</p>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__copy">
        We could not find the page for{' '}
        <span className="not-found__path">{location.pathname}</span>.
      </p>
      <Link className="primary-button" to="/">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
