import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { arrayUnique } from 'class-validator';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}



 async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleException(error);
    }

    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term});
    } 

    //MongoID
    if(!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim()});
    }



    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleException(error);
    }

      
  }

 async remove(_id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return {id};
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id});

    if(deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${_id}" not found`);
    }


    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Pokemon already exists');
    }
    console.log(error);
    throw new InternalServerErrorException('Error creating pokemon');
  }



}
function injectModel(target: typeof PokemonService, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

