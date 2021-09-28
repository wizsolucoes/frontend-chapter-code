<!-- omit in toc -->
# Operation coverage

Este projeto é um espaço para treinar a escrita de testes automatizados. Iniciamos uma aplicação com algumas funcionalidades, mas sem testes automatizados. O objeto é/foi cobrir 100% do código por testes.

<!-- omit in toc -->
## Sumário

- [Desenvolvimento, por onde começar](#desenvolvimento-por-onde-começar)
- [Estrutura](#estrutura)

## Desenvolvimento, por onde começar

1. Clone este monorepositório
2. Entre na pasta `projects/operation-coverage`
3. Rode a aplicação e os testes

```bash
# Instale as dependências
npm install

# Rodar a aplicação
ng serve

# Executar os testes
ng test --browsers=ChromeHeadless

# Executar o mesmo comando de teste executado pelo pipeline de CI
npm run test:ci
```

## Estrutura

A estrutura deste aplicação é baseada na [arquitetura de referência para aplicações Angular](https://github.com/wizsolucoes/angular-starter) da Wiz Soluções.
