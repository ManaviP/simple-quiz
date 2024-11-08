// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.brand}>Quiz App</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link href="/" style={styles.link}>Home</Link>
        </li>
       
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#0f81c7',
    color: 'white',
  },
  brand: {
    fontSize: '1.5rem',
  },
  navLinks: {
    listStyleType: 'none',
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default Navbar;
