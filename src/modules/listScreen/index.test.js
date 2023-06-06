import {render, fireEvent} from '@testing-library/react-native';
import axios from 'axios';
import ListScreen from '.';

jest.mock('axios');

describe('ListScreen component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list items correctly', async () => {
    const hits = [
      {
        author: 'John Doe',
        url: 'https://example.com',
        title: 'Test title',
        created_at: '2023-06-01T10:00:00.000Z',
        _tags: ['tag1', 'tag2'],
      },
      // add more sample items as needed
    ];

    axios.mockResolvedValueOnce({data: {hits}, status: 200});

    const {getByTestId} = render(<ListScreen navigation={{}} />);

    // Wait for initial fetch and render
    await new Promise(resolve => setTimeout(resolve, 100));

    for (const hit of hits) {
      const authorElement = getByTestId(`Author`);
      const urlElement = getByTestId(`Url`);
      const titleElement = getByTestId(`Title`);
      const createdAtElement = getByTestId(`CreatedAt`);
      const tagsElement = getByTestId(`TagList`);

      expect(authorElement).toBeDefined();
      expect(urlElement).toBeDefined();
      expect(titleElement).toBeDefined();
      expect(createdAtElement).toBeDefined();
      expect(tagsElement).toBeDefined();
    }
  });

  it('navigates to the raw JSON screen on item press', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const hits = [
      {
        author: 'John Doe',
        url: 'https://example.com',
        title: 'Test title',
        created_at: '2023-06-01T10:00:00.000Z',
        _tags: ['tag1', 'tag2'],
      },
    ];

    axios.mockResolvedValueOnce({data: {hits}, status: 200});

    const {getAllByTestId} = render(<ListScreen navigation={navigation} />);

    await new Promise(resolve => setTimeout(resolve, 100));

    const itemPressElements = getAllByTestId('ItemContainer');
    expect(itemPressElements.length).toBe(hits.length);

    for (let i = 0; i < hits.length; i++) {
      fireEvent.press(itemPressElements[i]);
      expect(navigation.navigate).toHaveBeenCalledWith('RawJSON', {
        data: hits[i],
      });
    }
  });

  it('error message on API error', async () => {
    const error = new Error('API error');

    axios.mockRejectedValueOnce(error);

    const screen = render(<ListScreen navigation={{}} />);
    expect(screen).toBeDefined();
  });

  it('opens the link on pressing the URL', async () => {
    const hits = [
      {
        author: 'John Doe',
        url: 'https://example.com',
        title: 'Test title',
        created_at: '2023-06-01T10:00:00.000Z',
        _tags: ['tag1', 'tag2'],
      },
    ];

    axios.mockResolvedValueOnce({data: {hits}, status: 200});

    const {getByTestId} = render(<ListScreen />);

    await new Promise(resolve => setTimeout(resolve, 100));

    const Url = getByTestId('ItemURL');

    fireEvent.press(Url);

    expect(Url.children[0]).toBe('https://example.com');
  });

  it('should update the search input value', () => {
    const {getByPlaceholderText} = render(<ListScreen />);
    const searchInput = getByPlaceholderText('Search');

    fireEvent.changeText(searchInput, 'example');

    expect(searchInput.props.value).toBe('example');
  });

  it('should filter the list data based on author', async () => {
    const hits = [
      {
        author: 'John Doe',
        url: 'https://example.com',
        title: 'Test title',
        created_at: '2023-06-01T10:00:00.000Z',
        _tags: ['tag1', 'tag2'],
      },
    ];

    axios.mockResolvedValueOnce({data: {hits}, status: 200});

    const {getByTestId, queryByText} = render(<ListScreen />);

    const searchInput = getByTestId('Search');

    await new Promise(resolve => setTimeout(resolve, 100));

    fireEvent.changeText(searchInput, 'John');

    const flatList = getByTestId('FlatList');

    flatList.props.data.forEach(data => {
      expect(data.author).toContain('John');
    });
  });

  it('should filter the list data based on title', async () => {
    const hits = [
      {
        author: 'John Doe',
        url: 'https://example.com',
        title: 'Test title',
        created_at: '2023-06-01T10:00:00.000Z',
        _tags: ['tag1', 'tag2'],
      },
    ];

    axios.mockResolvedValueOnce({data: {hits}, status: 200});

    const {getByTestId} = render(<ListScreen />);

    const searchInput = getByTestId('Search');

    await new Promise(resolve => setTimeout(resolve, 100));

    fireEvent.changeText(searchInput, 'Test');

    const flatList = getByTestId('FlatList');

    flatList.props.data.forEach(data => {
      expect(data.title).toContain('Test');
    });
  });
});
