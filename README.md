# Compras

Este é um aplicativo de lista de compras chamado "Compras", desenvolvido com React Native e Expo. O aplicativo permite que os usuários criem, editem, excluam e gerenciem uma lista de produtos, além de marcar itens como concluídos.

## Funcionalidades

- **Adicionar Produtos**: Os usuários podem adicionar novos produtos à lista através de um formulário.
- **Editar Produtos**: É possível editar os detalhes de produtos existentes.
- **Excluir Produtos**: Os usuários podem remover produtos da lista.
- **Marcar como Concluído**: Os itens podem ser marcados como concluídos, permitindo um melhor gerenciamento da lista de compras.
- **Persistência de Dados**: Utiliza SQLite para armazenar os dados dos produtos de forma persistente.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
Compras
├── src
│   ├── components
│   │   ├── ProductItem.tsx
│   │   └── ProductList.tsx
│   ├── screens
│   │   ├── HomeScreen.tsx
│   │   ├── EditProductScreen.tsx
│   │   └── AddProductScreen.tsx
│   ├── database
│   │   └── sqlite.ts
│   ├── navigation
│   │   └── AppNavigator.tsx
│   ├── types
│   │   └── index.ts
│   └── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd Compras
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o aplicativo:
   ```
   expo start
   ```

## Uso

Após iniciar o aplicativo, você será direcionado para a tela principal, onde poderá ver a lista de produtos. Utilize as opções disponíveis para adicionar, editar ou excluir produtos conforme necessário.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.