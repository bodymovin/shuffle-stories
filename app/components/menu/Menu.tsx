import { User } from '@prisma/client';
import { Link, useFetcher } from 'remix';
import { ColorSet } from '~/interfaces/colors';

interface MenuInterface {
  user: User
}

function buildStyle(color: string) {
  return {
    backgroundColor: color,
  };
}

function buildPalette(colors:ColorSet) {
  return (
    <>
      <span className="palette__button__color" style={buildStyle(colors.color1)} />
      <span className="palette__button__color" style={buildStyle(colors.color2)} />
      <span className="palette__button__color" style={buildStyle(colors.color3)} />
    </>
  );
}

function buildPaletteForm(colors:ColorSet, fetcher:any) {
  return (
    <div className="palette">
      <fetcher.Form method="post" action="/color">
        <input type="hidden" name="color1" value={colors.color1} />
        <input type="hidden" name="color2" defaultValue={colors.color2} />
        <input type="hidden" name="color3" defaultValue={colors.color3} />
        <button
          type="submit"
          className="palette__button"
          name="palette"
          value="1"
        >
          {buildPalette(colors)}
        </button>
      </fetcher.Form>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function buildCustomPalette(colors:ColorSet, fetcher:any) {
  function handleChange(event: any) {
    fetcher.submit(event.currentTarget);
  }
  return (
    <fetcher.Form method="post" action="/color" onChange={handleChange}>
      <input type="color" name="color1" defaultValue={colors.color1} />
      <input type="color" name="color2" defaultValue={colors.color2} />
      <input type="color" name="color3" defaultValue={colors.color3} />
      <input type="submit" />
    </fetcher.Form>
  );
}

function buildPalettePicker(fetcher: any) {
  return (
    <div>
      <p className="palette__title">Choose palette</p>
      {buildPaletteForm({ color1: '#353535', color2: '#FFEBD5', color3: '#F3E7D6' }, fetcher)}
      {buildPaletteForm({ color1: '#e1e1e1', color2: '#30233c', color3: '#362b4b' }, fetcher)}
      {buildPaletteForm({ color1: '#970e0e', color2: '#b1bcc6', color3: '#181ad0' }, fetcher)}
    </div>
  );
}

function buildClipPath() {
  let i = 0;
  const rectWidth = 4;
  const rects = [];
  while (i < 50 / rectWidth) {
    rects.push(
      <rect
        key={i}
        x={i * rectWidth}
        y={-rectWidth / 2}
        width={rectWidth}
        height={50 + rectWidth}
        rx={rectWidth / 2}
        ry={rectWidth / 2}
        className={`clip-rect clip-rect-${i}`}
      />,
    );
    i += 1;
  }
  return rects;
}

function buildLoginForm(user: User) {
  if (user.id === 'Anonymous') {
    return (
      <Link to="/login" className="login">Login</Link>
    );
  }
  return (
    <form action="/logout" method="post" className="logout">
      <button type="submit" className="logout__button">
        Logout
      </button>
    </form>
  );
}

function Menu(props: MenuInterface) {
  const fetcher = useFetcher();
  const { user } = props;

  return (
    <aside className="menu">
      <input type="checkbox" id="menu-checkbox" className="menu__checkbox" />
      <div className="menu__slider">
        {/* {buildCustomPalette(colors, fetcher)} */}
        <ul>
          <li>
            {buildPalettePicker(fetcher)}
          </li>
          <li>
            {buildLoginForm(user)}
          </li>
        </ul>
      </div>
      <label
        className="menu-button"
        htmlFor="menu-checkbox"
      >
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ width: '100%', height: '100%' }}>
          <defs>
            <symbol id="rect-id">
              <rect
                x={13}
                y={24}
                width={24}
                height={2}
              />
            </symbol>
            <clipPath id="menu-clip">
              {buildClipPath()}
            </clipPath>
          </defs>
          <g className="menu-open">
            <rect
              width={50}
              height={50}
            />
            <use
              xlinkHref="#rect-id"
              transform="translate(0, -5)"
            />
            <use
              xlinkHref="#rect-id"
              transform="translate(0, 0)"
            />
            <use
              xlinkHref="#rect-id"
              transform="translate(0, 5)"
            />
          </g>
          <g clipPath="url(#menu-clip)" className="menu-close">
            <rect
              width={50}
              height={50}
            />
            <use
              xlinkHref="#rect-id"
              transform="translate(25, 25) rotate(45) translate(-25, -25)"
            />
            <use
              xlinkHref="#rect-id"
              transform="translate(25, 25) rotate(-45) translate(-25, -25)"
            />
          </g>
        </svg>
      </label>
    </aside>
  );
}
export default Menu;
