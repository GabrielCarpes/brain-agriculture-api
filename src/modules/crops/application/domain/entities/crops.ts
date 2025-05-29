import { Replace } from "@helpers/replace";
import { uuid } from "@helpers/uuid";

export interface CropProps {
  id: string;
  culture: string;
  harvest: string;
  farmId: string;
  createdAt: Date;
  updatedAt: Date;
}

type CropWithOptionalProps = Replace<
  CropProps,
  {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
>;

export class Crop {
  private props: CropProps;

  constructor({ ...props }: CropWithOptionalProps) {
    this.props = {
      ...props,
      id: props.id ?? uuid(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.id;
  }

  public get culture(): string {
    return this.props.culture;
  }

  public set culture(value: string) {
    this.props.culture = value;
  }

  public get harvest(): string {
    return this.props.harvest;
  }

  public set harvest(value: string) {
    this.props.harvest = value;
  }

  public get farmId(): string {
    return this.props.farmId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
