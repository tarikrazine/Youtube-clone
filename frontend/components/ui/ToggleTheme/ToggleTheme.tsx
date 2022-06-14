import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

interface ToggleThemeProps {

}

const ToggleTheme: React.FunctionComponent<ToggleThemeProps> = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </ActionIcon>
    );
}

export default ToggleTheme