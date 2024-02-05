import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class EmployeesUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  readonly employeeId: number;

  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly salary: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  readonly commissionPct: number | null;
}