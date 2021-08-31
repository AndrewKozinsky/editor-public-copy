import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import LanguageSection from '../LanguageSection/LanguageSection'
import ThemeSection from '../ThemeSection/ThemeSection'

export default function SettingsEditorTabContent() {
    return (
        <div>
            <Wrapper>
                <LanguageSection />
            </Wrapper>

            <Wrapper t={20}>
                <ThemeSection />
            </Wrapper>
        </div>
    )
}
