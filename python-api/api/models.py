from typing import List

from pydantic import BaseModel


# {"channels" : ["id1", "id2", ...]}
class IgnoredChannels(BaseModel):
    channels: List[str]


class LfgSubs(BaseModel):
    subscribe: List[str]


class LfgPost(BaseModel):
    description: str
    userID: str
    platform: str
    time: int


