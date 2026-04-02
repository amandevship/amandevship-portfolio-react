import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  it('renders the brand name', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByText('Aman Sharma')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});
