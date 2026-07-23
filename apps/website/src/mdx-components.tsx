import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

import { Callout, CodeExample, ComponentStatus, Preview } from './components/documentation';

function MdxLink(props: ComponentPropsWithoutRef<'a'>) {
  return <a className="sd-link" {...props} />;
}

function MdxTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="sd-table-container" role="region" aria-label="Tabel derulabil" tabIndex={0}>
      <table className="sd-table" {...props} />
    </div>
  );
}

const components: MDXComponents = {
  a: MdxLink,
  blockquote: (props) => <blockquote className="sd-doc-blockquote" {...props} />,
  Callout,
  CodeExample,
  ComponentStatus,
  h2: (props) => <h2 className="sd-doc-heading" {...props} />,
  h3: (props) => <h3 className="sd-doc-heading" {...props} />,
  hr: (props) => <hr className="sd-doc-divider" {...props} />,
  Preview,
  table: MdxTable,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
