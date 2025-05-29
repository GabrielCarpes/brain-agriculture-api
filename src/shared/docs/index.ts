import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule } from 'nestjs-redoc';
import { name, version } from '../../../package.json';

export class Docs {
  public static async initialize(app: any): Promise<void> {
    const config = new DocumentBuilder()
      .setTitle('API de Produtores Rurais')
      .setDescription(
        `
        Esta API permite o gerenciamento de produtores rurais, incluindo:

        - Cadastro, atualização e exclusão de produtores.
        - Registro de fazendas e culturas associadas a cada produtor.
        - Validação de CPF ou CNPJ.
        - Validação de área total da fazenda (área agricultável + vegetação).
        - Associação de culturas por safra em cada propriedade.
        - Visualização de estatísticas agregadas em formato de gráficos:

          - Por estado,
          - Por cultura plantada,
          - Por uso do solo (área agricultável vs vegetação).

        Também fornece um endpoint para verificação de status da aplicação (health check).
      `,
      )
      .setVersion(version)
      .addTag('Produtores', 'Endpoints relacionados aos produtores rurais.')
      .addTag(
        'Fazendas',
        'Endpoints para gerenciamento de propriedades rurais.',
      )
      .addTag(
        'Culturas',
        'Endpoints para registro de culturas por safra e propriedade.',
      )
      .addTag(
        'Dashboard',
        'Endpoints de estatísticas e visualizações consolidadas.',
      )
      .addTag('Saúde', 'Verificação de saúde da API.')
      .setContact(
        'Equipe de Suporte',
        'https://seudominio.com/suporte',
        'suporte@seudominio.com',
      )
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/v1/swagger', app, document);

    await RedocModule.setup('/v1/docs', app, document, {
      title: 'Documentação da API de Produtores Rurais',
      logo: {
        url: 'https://nestjs.com/img/logo-small.svg',
        backgroundColor: '#F0F0F0',
        altText: 'Logo da API',
      },
      hideDownloadButton: false,
      hideHostname: false,
    });
  }
}
