export interface OfferEditorFormProps<T> {
  value: T;
  onChange: (next: T) => void;
}
