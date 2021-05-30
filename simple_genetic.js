const TARGET = "hello".split("");
const TARGET_LENGTH = TARGET.length;
const POP_SIZE = 10000;
const NUM_CHILDREN = 2;
const alphabet = " abcdefghijklmnopqrstuvwxyz".split("");

// https://machinelearningmastery.com/simple-genetic-algorithm-from-scratch-in-python/

class Individual {
    constructor(chromosome) {
        this.chromosome = chromosome;
    }
    get_chromosome() {
        return this.chromosome;
    }
    mutate(chromosome) {
        if (Math.floor(Math.random() * TARGET_LENGTH) == 1) {
            const random_char = alphabet[Math.floor(Math.random() * alphabet.length)];
            const random_pos = Math.floor(Math.random() * TARGET_LENGTH);
            chromosome[random_pos] = random_char;
        }
        return chromosome;
    }
    create_children(partner) {
        let chrom1 = this.chromosome;
        let chrom2 = partner.get_chromosome();
        const crossover = Math.floor(Math.random(1, chrom1.length - 2));

        let child1 = chrom1.slice(0, crossover).concat(chrom2.slice(crossover));
        let child2 = chrom2.slice(0, crossover).concat(chrom1.slice(crossover));
        return [new Individual(this.mutate(child1)), new Individual(this.mutate(child2))];
    }
    get_fitness() {
        let fitness_level = 0;
        for (let i = 0; i < TARGET_LENGTH; i++) {
            if (TARGET[i] == this.chromosome[i]) {
                fitness_level++;
            }
        }
        return fitness_level;
    }
}

function create_random_chromosome() {
    let chromosome = [];
    for (let i = 0; i < TARGET_LENGTH; i++) {
        let rand_index = Math.floor(Math.random() * alphabet.length);
        chromosome.push(alphabet[rand_index]);
    }
    return chromosome;
}

function create_initial_population(pop_size) {
    let population = [];
    for (let i = 0; i < pop_size; i++) {
        population.push(new Individual(create_random_chromosome()));
    }
    return population;
}

function main() {
    let population = create_initial_population(POP_SIZE);
    let generations = 0;
    while (population.length > 0) {
        let new_population = [];
        for (let i = 0; i < population.length - 1; i += 2) {

            if (TARGET_LENGTH === population[i].get_fitness() ||
                TARGET_LENGTH === population[i + 1].get_fitness()) {
                console.log(`TARGET REACHED (in ${generations} generations)!`);
                break;
            }
            children = population[i].create_children(population[i + 1]);
            new_population.push(children[0]);
            new_population.push(children[1]);
        }
        population = new_population.sort(
            (a, b) => a.get_fitness() > b.get_fitness() ? -1 : 1).slice(0, population.length - 1);
        generations++;
        if (population.length > 0) {
            let first_string = population[0].get_chromosome().toString();
            console.log(first_string);
        }
    }
}

main();