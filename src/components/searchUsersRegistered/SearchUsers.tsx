'use client'
import { cn } from "@/utils/cn";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  searchUsers: string;
  setSearchUsers: (value: string) => void;
}

export const SearchUsers = ({ searchUsers, setSearchUsers }: Props) => {

  const onChange = (e: ChangeEvent<any>) => {
    setSearchUsers(e.target.value);
  }

  return (
    <div className="mx-auto mb-5 flex   w-1/4">
      <LabelInputContainer>
        <Input id="inputSearch" placeholder="Buscar...." value={searchUsers} type="text" onChange={onChange} />
      </LabelInputContainer>
    </div>
  )

}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
