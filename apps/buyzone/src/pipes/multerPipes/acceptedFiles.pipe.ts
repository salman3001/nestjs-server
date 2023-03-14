import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class acceptedFiles implements PipeTransform {
  constructor(private types: string[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    return true;
  }
}
