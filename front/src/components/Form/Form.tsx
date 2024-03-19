import { Component, createSignal, createEffect, Show } from 'solid-js';
import { validateUrl } from '../../utils/validators';
import { shortenUrl } from '../../utils/api';
import FormField from './FormField';
import ResultComponent from './ResultComponent';
import { ShortenResponse } from '../../types/types';
import { SiCurl } from 'solid-icons/si';
import { AiOutlineFieldTime } from 'solid-icons/ai';
import { BiSolidNoEntry } from 'solid-icons/bi';
import { AiOutlineColumnWidth } from 'solid-icons/ai';
import { SiAutoprefixer } from 'solid-icons/si';
import { BsBorderStyle } from 'solid-icons/bs';
import { SiFastify } from 'solid-icons/si';
import { Transition } from 'solid-transition-group';

const Form: Component = () => {
  const [url, setUrl] = createSignal('');
  const [command, setCommand] = createSignal('nyart');
  const [expiration, setExpiration] = createSignal(60);
  const [maxClicks, setMaxClicks] = createSignal('');
  const [customPrefix, setCustomPrefix] = createSignal('');
  const [hashLength, setHashLength] = createSignal(4);
  const [error, setError] = createSignal('');
  const [response, setResponse] = createSignal<ShortenResponse | null>(null);
  const [selectedButton, setSelectedButton] = createSignal('nyart');
  const [copySuccess, setCopySuccess] = createSignal('');

  const apiUrl = import.meta.env.VITE_API_URL;
  const copyToClipboard = async () => {
    try {
      const shortUrl = response()?.shortUrls[0]?.shortUrl;
      if (shortUrl) {
        await navigator.clipboard.writeText(`${apiUrl}/${shortUrl}`);
        setCopySuccess('Okie~');
      }
    } catch (err) {
      setCopySuccess('Again');
    }
  };
  createEffect(() => {
    if (copySuccess() !== '') {
      setTimeout(() => setCopySuccess(''), 2000);
    }
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setError('');
    setResponse(null);

    const validatedUrl = validateUrl(url());
    if (!validatedUrl) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const response = await shortenUrl({
        urls: [validatedUrl],
        command: command(),
        expiration: expiration() * 60,
        maxClicks: maxClicks() || '0',
        customPrefix: customPrefix() || '0',
        hashLength: hashLength(),
      });

      setResponse(response);
    } catch (err) {
      setError('An error occurred while shortening the URL');
    }
  };

  return (
    <div class="circle">
      <form class="parent" onSubmit={handleSubmit}>
        <div class="nyaUrlStyle">
          <label class="nyaLable">
            <BsBorderStyle />
            <span>Style</span>
          </label>
          <div class="mewButtonInline">
            <button
              type="button"
              onClick={() => {
                setCommand('nyart');
                setSelectedButton('nyart');
              }}
              class={selectedButton() === 'nyart' ? 'nyaSelected' : ''}
            >
              nyart
            </button>
            <button
              type="button"
              onClick={() => {
                setCommand('short');
                setSelectedButton('short');
              }}
              class={selectedButton() === 'short' ? 'nyaSelected' : ''}
            >
              short
            </button>
          </div>
        </div>
        <div class="nyaUrl">
          <FormField
            label="URL"
            ico={<SiCurl />}
            value={url()}
            onChange={(e) => {
              if (e.currentTarget instanceof HTMLInputElement) {
                setUrl(e.currentTarget.value);
              }
            }}
            error={error()}
          />
        </div>
        <div class="nyaResponse">
          <Transition name="fade">
            <div class="nyaField">
              <ResultComponent apiUrl={apiUrl} response={response()} copyToClipboard={copyToClipboard} copySuccess={copySuccess()} />
            </div>
          </Transition>
        </div>
        <div class="nyaExpr">
          <FormField
            label="Expr"
            ico={<AiOutlineFieldTime />}
            type="number"
            min="1"
            max="262800"
            value={expiration().toString()}
            onChange={(e) => {
              if (e.currentTarget instanceof HTMLInputElement) {
                setExpiration(parseInt(e.currentTarget.value));
              }
            }}
          />
        </div>
        <div class="NyaEntrs">
          <FormField
            label="Entrs"
            ico={<BiSolidNoEntry />}
            type="number"
            min="1"
            max="2147483647"
            value={maxClicks()}
            onChange={(e) => {
              if (e.currentTarget instanceof HTMLInputElement) {
                setMaxClicks(e.currentTarget.value);
              }
            }}
          />
        </div>
        <div class="divNyaLength">
          <div class="nyaField">
            <label class="nyaLable">
              <AiOutlineColumnWidth />
              <span>Length</span>
            </label>
            <select
              value={hashLength().toString()}
              onChange={(e) => {
                if (e.currentTarget instanceof HTMLSelectElement) {
                  setHashLength(parseInt(e.currentTarget.value));
                }
              }}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <div class="nyaPrefix">
          <FormField
            label="Prefix"
            ico={<SiAutoprefixer />}
            value={customPrefix()}
            onChange={(e) => {
              if (e.currentTarget instanceof HTMLInputElement) {
                setCustomPrefix(e.currentTarget.value);
              }
            }}
          />
        </div>
        <div class="nyaSubmit">
          <div class="nyaField">
            <button type="submit">Shorten URL</button>
          </div>
        </div>
        <div class="nyaStat">
          <Show when={response()?.shortUrls?.some((url) => url.originalUrl && url.shortUrl)}>
            <strong>{response()?.shortUrls?.[0]?.originalUrl}</strong> has been successfully shortened in <strong>{response()?.elapsedTime?.toFixed(1)}μs</strong>
            <SiFastify />
          </Show>
        </div>
      </form>
    </div>
  );
};

export default Form;
