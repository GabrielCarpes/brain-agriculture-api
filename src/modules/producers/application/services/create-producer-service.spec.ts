// import { Producer } from "../entities/producer.entity";
// import { CreateProducerService } from "./create-transaction.service";

// const producerMocked = producerMock({});

// let createProducerService: CreateProducerService;

// let spyCreateProducerUseCaseExecute: jest.SpyInstance<
//   Promise<void>,
//   [payload: Producer]
// >;

// describe('CreateProducerService', () => {
//   beforeEach(async () => {
//     const createProducerUseCaseMocked = {
//       provide: CreateProducerUseCase,
//       useValue: {
//         execute: jest.fn(() => producerMocked),
//       },
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [createProducerUseCaseMocked],
//     }).compile();

//     const createProducerUseCase =
//       module.get<CreateProducerUseCase>(CreateProducerUseCase);

//     createProducerService = new CreateProducerService(createProducerUseCase);

//     spyCreateProducerUseCaseExecute = jest.spyOn(
//       createProducerUseCase,
//       'execute',
//     );
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should create a producer successfully', async () => {
//     const props: CreateProducerRequest = {
//       name: 'John Doe',
//       document: '12345678901',
//     };

//     await expect(createProducerService.execute(props)).resolves.toBeUndefined();

//     expect(spyCreateProducerUseCaseExecute).toHaveBeenCalledTimes(1);
//     expect(spyCreateProducerUseCaseExecute).toHaveBeenCalledWith(props);
//   });

//   it('should throw CreateProducerUnexpectedError if use case throws unexpected error', async () => {
//     spyCreateProducerUseCaseExecute.mockImplementationOnce(() => {
//       throw new CreateProducerUnexpectedError();
//     });

//     const props: CreateProducerRequest = {
//       name: 'Jane Doe',
//       document: '12345678901',
//     };

//     await expect(createProducerService.execute(props)).rejects.toThrow(
//       CreateProducerUnexpectedError,
//     );
//   });

//   it('should throw InvalidDocumentFormatError if document is malformed', async () => {
//     spyCreateProducerUseCaseExecute.mockImplementationOnce(() => {
//       throw new InvalidDocumentFormatError();
//     });

//     const props: CreateProducerRequest = {
//       name: 'Invalid Format',
//       document: 'invalid_doc',
//     };

//     await expect(createProducerService.execute(props)).rejects.toThrow(
//       InvalidDocumentFormatError,
//     );
//   });

//   it('should throw DuplicateDocumentError if document already exists', async () => {
//     spyCreateProducerUseCaseExecute.mockImplementationOnce(() => {
//       throw new DuplicateDocumentError();
//     });

//     const props: CreateProducerRequest = {
//       name: 'Existing Document',
//       document: '12345678901',
//     };

//     await expect(createProducerService.execute(props)).rejects.toThrow(
//       DuplicateDocumentError,
//     );
//   });
// });
