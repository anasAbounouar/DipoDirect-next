interface ButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel: string; // ARIA label for accessibility
  height?: string;
  [key: string]: any; // Allow any other property
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';

const MyButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  className,
  ariaLabel,
  height,
  ...props
}) => {
  return (
    <Button
      color="default"
      role="button"
      onClick={onClick}
      className={`btn ${className || ''} ${
        height || 'h-[50px]'
      } flex flex-row items-center justify-center`}
      aria-label={ariaLabel} // Fallback to text if no ariaLabel is provided
      tabIndex={0} // Ensure button is focusable
      {...props}
    >
      {text}
      {icon && (
        <span className="icon-wrapper" aria-hidden="true">
          {icon}
        </span>
      )}
    </Button>
  );
};

export default MyButton;
