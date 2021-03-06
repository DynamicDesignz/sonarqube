/*
 * SonarQube
 * Copyright (C) 2009-2019 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import HelpTooltip from 'sonar-ui-common/components/controls/HelpTooltip';
import { translate } from 'sonar-ui-common/helpers/l10n';
import { AlmSettingsBinding } from '../../../../types/alm-settings';

export interface AlmDefinitionFormFieldProps<B extends AlmSettingsBinding> {
  autoFocus?: boolean;
  help?: React.ReactNode;
  id: string;
  isTextArea?: boolean;
  maxLength?: number;
  onFieldChange: (id: keyof B, value: string) => void;
  propKey: keyof B;
  readOnly?: boolean;
  value: string;
}

export function AlmDefinitionFormField<B extends AlmSettingsBinding>(
  props: AlmDefinitionFormFieldProps<B>
) {
  const {
    autoFocus,
    help,
    id,
    isTextArea,
    maxLength,
    onFieldChange,
    propKey,
    readOnly = false,
    value
  } = props;

  return (
    <div className="modal-field">
      <label className="display-flex-center" htmlFor={id}>
        {translate('settings.pr_decoration.form', id)}
        <em className="mandatory spacer-right">*</em>
        {help && <HelpTooltip overlay={help} placement="right" />}
      </label>
      {isTextArea ? (
        <textarea
          className="settings-large-input"
          disabled={readOnly}
          id={id}
          maxLength={maxLength || 2000}
          onChange={e => onFieldChange(propKey, e.currentTarget.value)}
          required={true}
          rows={5}
          value={value}
        />
      ) : (
        <input
          autoFocus={autoFocus}
          className="input-super-large"
          disabled={readOnly}
          id={id}
          maxLength={maxLength || 100}
          name={id}
          onChange={e => onFieldChange(propKey, e.currentTarget.value)}
          size={50}
          type="text"
          value={value}
        />
      )}
    </div>
  );
}
