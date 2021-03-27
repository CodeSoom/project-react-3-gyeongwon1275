import postReducer, { setFormVisible } from '../postReducer';

describe('postReducer', () => {
  describe('openPostForm', () => {
    it('changes setFormVisible', () => {
      const initialState = { formVisible: false };

      const state = postReducer(initialState, setFormVisible(true));

      expect(state.formVisible).toBe(true);
    });
  });
});
