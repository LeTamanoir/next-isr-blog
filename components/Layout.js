const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mt-3 mb-5">
        This is a <span className="text-primary">Blog</span> made with ISR
      </h1>
      {children}
    </div>
  );
};

export default Layout;
