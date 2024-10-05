import dashboard from "../assets/dashboard.svg";
import team from "../assets/team.svg";
import references from "../assets/references.svg";
function MainNav() {
  return (
    <>
      <nav>
        <ul id="links-list">
          <li>
            <img src={dashboard} />
          </li>
          <li>
            {" "}
            <img src={team} />
          </li>
          <li>
            {" "}
            <img src={references} />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
