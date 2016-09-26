import f from '../../index.d.ts';

const filter1 = f()
    .or(f().eq(x => x.toLower('name'), 'apple'))
    .or(f().eq(x => x.toLower('name'), 'microsoft'))
    .and(f().eq(x => x.toLower('type'), 'os'));

const filter2 = f('or')
    .eq(x => x.toLower('name'), 'apple')
    .eq(x => x.toLower('name'), 'microsoft')
    .and(x => x.ne('type', 'OS'));

const filter3 = f('or')
    .eq("tolower('name')", 'apple')
    .eq("tolower('name')", 'microsoft')
    .and("ne('type', 'OS')");

const filter4 = f()
    .ne('type', 'OS')
    .and(f.or().eq('nama', 'Apple').eq('name', 'Microsoft'));

const filter5 = f()
    .ne('type', 'OS')
    .in('name', ['Apple', 'Microsoft']);

const filter6 = f()
    .fn('substringof', 'Name', 'John', true, true);

console.log(filter1.toString());

