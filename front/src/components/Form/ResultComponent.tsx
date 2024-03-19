import { Component, createMemo, Show } from 'solid-js';
import { TbDeviceImacShare } from 'solid-icons/tb';
import { BiRegularCopyAlt } from 'solid-icons/bi';
import { ShortenResponse } from '../../types/types';

interface ResultComponentProps {
  apiUrl: string;
  response: ShortenResponse | null;
  copyToClipboard: () => void;
  copySuccess: string;
}

const ResultComponent: Component<ResultComponentProps> = (props) => {
  const key = createMemo(() => Math.random().toString(36).substring(2, 8));
  console.log(key);
  return (
    <Show when={props.response && props.response.shortUrls.length > 0} keyed={true}>
      <div>
        <label class="nyaLable nyaWarning">
          <TbDeviceImacShare />
          <span>Result:</span>
        </label>
        <div class="nyaRows">
          <code class="nyaLink">
            {props.apiUrl}/{props.response?.shortUrls[0].shortUrl}
          </code>
          <button class="nyaButton" type="button" onClick={props.copyToClipboard}>
            <BiRegularCopyAlt />
          </button>
          {props.copySuccess && <div>{props.copySuccess}</div>}
        </div>
      </div>
    </Show>
  );
};

export default ResultComponent;
