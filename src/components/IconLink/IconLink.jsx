import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @param {React.ReactNode} icon
 * @param {string} label
 * @param {To} to (react-router To)
 * @returns {JSX.Element}
 * @constructor
 */
export const IconLink = ({
  icon,
  label,
  to
}) => {
  return (
    <>
      <Link className='iconLink__container' to={to}>
        <span>{icon}</span>
        <h3>{label}</h3>
      </Link>
    </>
  );
};
