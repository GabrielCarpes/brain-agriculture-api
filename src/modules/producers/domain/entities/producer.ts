import { Replace } from "@helpers/replace";
import { uuid } from "@helpers/uuid";
import { Farm } from "@modules/farms/domain/entities/farm";

export interface ProducerProps {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
  createdAt: Date;
  updatedAt: Date;
}

type ProducerWithOptionalProps = Replace<
  ProducerProps,
  {
    id?: string;
    farms?: Farm[];
    createdAt?: Date;
    updatedAt?: Date;
  }
>;

export class Producer {
  private props: ProducerProps;

  constructor({ ...props }: ProducerWithOptionalProps) {
    this.props = {
      ...props,
      id: props.id ?? uuid(),
      farms: props.farms ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get document(): string {
    return this.props.document;
  }

  public set document(value: string) {
    this.props.document = value;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public get farms(): Farm[] {
    return this.props.farms;
  }

  public set farms(farms: Farm[]) {
    this.props.farms = farms;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
