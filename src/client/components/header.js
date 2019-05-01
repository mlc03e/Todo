import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <Link to="/" style={{fontSize: "50px", spacing: '30px', color: "white", textDecoration: 'none' }}>MyTodos</Link>

    </div>
  )
};

export default Header;
