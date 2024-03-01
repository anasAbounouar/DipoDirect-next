'use client'
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useRouter } from 'next/router'; // Import useRouter

interface Option {
  id: number | string;
  value: string;
  label: string;
}

interface SelectComponentProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  setSelectedOption?: (value: string) => void;
  selectedOption?: string;
  labelId: string; // for accessibility
}

export default function CustomDropdown({
  options,
  placeholder,
  
  labelId, // Note: Same as above, provided but not directly used in the component.
}: SelectComponentProps) {
  
    const router = useRouter(); // Use the useRouter hook
  // Updated handleSelectChange to use the router for navigation
  const handleSelectChange = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{placeholder}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        {options.map((option) => (
          <DropdownItem key={option.id} onClick={() => handleSelectChange(option.value)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
