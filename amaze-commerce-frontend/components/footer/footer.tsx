export default function Footer() {
  return (
    <footer className="footer mt-6 bg-base-300 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact</h6>
        <div className="grid grid-flow-col gap-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.795-1.75-1.732s.784-1.732 1.75-1.732 1.75.795 1.75 1.732-.784 1.732-1.75 1.732zm13.5 11.268h-3v-5.414c0-1.291-.025-2.952-1.798-2.952-1.8 0-2.075 1.402-2.075 2.851v5.515h-3v-10h2.877v1.367h.041c.4-.759 1.378-1.556 2.836-1.556 3.033 0 3.594 1.997 3.594 4.591v5.598z" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          {/* Email */}
          <a className="" href="mailto:aiarnob23@gmail.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 12.713l-8-5.6v9.887h16v-9.887l-8 5.6zm0-2.302l8-5.598h-16l8 5.598zm10-5.411v11.999c0 1.104-.896 2-2 2h-16c-1.104 0-2-.896-2-2v-11.999c0-1.104.896-2 2-2h16c1.104 0 2 .896 2 2z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
}
