import SharkyFin from "./sharkFin.svg?r";

type SvgrIcon = React.FC<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

/**
 * @param {string} [props.color="inherit"] Icon's color
 * @param {string} [props.fontSize="1em"] Icon's size
 * @param {string} [props.title] Icon's title for accesibility
 * @returns {SvgrIcon}
 */
const Ico = { SharkyFin };

export type { SvgrIcon };
export { Ico };
