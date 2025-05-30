import { Replace } from "@helpers/replace";
import { uuid } from "@helpers/uuid";
import { Crop } from "@modules/crops/domain/entities/crops";

export interface FarmProps {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: Crop[];
  producerId: string;
  createdAt: Date;
  updatedAt: Date;
}

type FarmWithOptionalProps = Replace<
  FarmProps,
  {
    id?: string;
    crops?: Crop[];
    createdAt?: Date;
    updatedAt?: Date;
  }
>;

export class Farm {
  private props: FarmProps;

  constructor({ ...props }: FarmWithOptionalProps) {
    this.props = {
      ...props,
      id: props.id ?? uuid(),
      crops: props.crops ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public get city(): string {
    return this.props.city;
  }

  public set city(value: string) {
    this.props.city = value;
  }

  public get state(): string {
    return this.props.state;
  }

  public set state(value: string) {
    this.props.state = value;
  }

  public get totalArea(): number {
    return this.props.totalArea;
  }

  public set totalArea(value: number) {
    this.props.totalArea = value;
  }

  public get arableArea(): number {
    return this.props.arableArea;
  }

  public set arableArea(value: number) {
    this.props.arableArea = value;
  }

  public get vegetationArea(): number {
    return this.props.vegetationArea;
  }

  public set vegetationArea(value: number) {
    this.props.vegetationArea = value;
  }

  public get crops(): Crop[] {
    return this.props.crops;
  }

  public set crops(crops: Crop[]) {
    this.props.crops = crops;
  }

  public get producerId(): string {
    return this.props.producerId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
