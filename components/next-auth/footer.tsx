import Link from "next/link"
import { dependencies } from "package.json"

export default function Footer() {
  return (
    <footer className="footer">
      <hr />
      <ul className="navItems">
        <li className="navItem">
          <a href="https://next-auth.js.org">Documentation</a>
        </li>
        <li className="navItem">
          <a href="https://www.npmjs.com/package/next-auth">NPM</a>
        </li>
        <li className="navItem">
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li className="navItem">
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
        <li className="navItem">
          <em>next-auth@{dependencies["next-auth"]}</em>
        </li>
      </ul>
      <style jsx>{`
        .footer {
          margin-top: 2rem;
        }
        
        .navItems {
          margin-bottom: 1rem;
          padding: 0;
          list-style: none;
        }
        
        .navItem {
          display: inline-block;
          margin-right: 1rem;
        }
      `}</style>
    </footer>
  )
}
